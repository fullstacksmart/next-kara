import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import OptionsToggler from '../../components/option-toggler/OptionToggler';
import { Layout } from '../../containers/layout';
import { Button } from '../../components/buttons';
import InputField from '../../components/input-field/InputField';
import { Dispatch, SetStateAction, useState } from 'react';
import { PageProps, SignupFormValues } from '../../lib/types';
import { withTranslation } from 'i18n.config';
import { useMutation, gql } from '@apollo/client';
import styles from './Signup.module.css';
import { GenderSelector } from 'components/gender-selector/GenderSelector';
import { useAuth } from '../../hooks/useAuth';
import { defaultSignupFormValues } from 'lib/defaults/common';
import { transformSignupFormValuesToTalentInput } from 'lib/transformers/talent';
import { BaseUser, UserType } from 'lib/types/common';
import Error from 'components/error-handling';
import { isError, FirebaseError } from 'lib/types/auth';
import useRedirectToProfile from 'hooks/useRedirectToProfile';

const ADD_EMPLOYER = gql`
  mutation AddEmployer($input: UserInput!) {
    addEmployer(input: $input) {
      id
    }
  }
`;

const ADD_TALENT = gql`
  mutation AddTalent($input: TalentInput!) {
    addTalent(input: $input) {
      id
    }
  }
`;

const SignUpPage = ({ t }: PageProps): React.ReactElement => {
  const [formValues, setFormValues] = useState<SignupFormValues>(
    defaultSignupFormValues,
  );

  const { redirectToProfile } = useRedirectToProfile();

  const [passwordsIdentical, setPasswordsIdentical] = useState(true);
  const [createUser] = useMutation(ADD_EMPLOYER);
  const [createTalent] = useMutation(ADD_TALENT);
  const [passwordRepeat, setPasswordRepeat] = useState<Record<string, unknown>>(
    { passwordConfirm: '' },
  );
  const [error, setError] = useState<FirebaseError | null>(null);

  const auth = useAuth();

  const handlePasswordRepeat = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setPasswordRepeat({ passwordConfirm: e.target.value });
    setPasswordsIdentical(formValues.password === e.target.value);
  };

  const company =
    formValues.type === UserType.EMPLOYER ? (
      <InputField
        propName="company"
        value={'company' in formValues ? formValues.company : ''}
        label={t('companyName')}
        setValue={
          setFormValues as unknown as Dispatch<
            SetStateAction<Record<string, unknown>>
          >
        }
        required
      />
    ) : null;

  // TODO: refactor long handleSubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formValues.email && formValues.password) {
      setError(null);
      auth
        .signup(formValues.email, formValues.password)
        .then((response) => {
          if (isError(response)) {
            setError(response);
          } else if (response.user) {
            const id = response.user.uid || '';
            const input = {
              ...transformSignupFormValuesToTalentInput(formValues),
              id,
            };
            if (formValues.type === UserType.TALENT) {
              return createTalent({
                variables: {
                  input,
                },
              }).then(({ data }) => {
                const user = data.addTalent;
                auth.setContextUser(user);
                redirectToProfile({ userType: UserType.TALENT, id });
                //router.push(`/talents/${id}`);
              });
            } else {
              return createUser({
                variables: {
                  input: {
                    ...formValues,
                    id,
                  },
                },
              }).then(({ data }) => {
                const user = data.addEmployer;
                auth.setContextUser(user);
                redirectToProfile({ userType: UserType.EMPLOYER, id });
                //router.push(`/employers/${id}`);
              });
            }
          }
        })
        .catch((error: Error) => {
          console.error(error); //eslint-disable-line no-console
        });
    }
  };

  return (
    <Layout title="sign up" t={t}>
      {error && <Error error={error} />}
      <Card>
        <CardContent>
          <Container>
            <Typography variant="h2">{t('pages.signup.header')}</Typography>
            <form onSubmit={handleSubmit}>
              <OptionsToggler
                options={[
                  { value: 'TALENT', display: t('type.talent') },
                  { value: 'EMPLOYER', display: t('type.employer') },
                ]}
                optionsLabel="type"
                setOption={(type) => {
                  setFormValues((oldValues) => ({
                    ...oldValues,
                    type: UserType[type as keyof typeof UserType],
                  }));
                }}
              />
              <Box component="div">
                <GenderSelector
                  t={t}
                  updateFunction={
                    setFormValues as Dispatch<SetStateAction<Partial<BaseUser>>>
                  }
                />
                <InputField
                  propName={['name', 'firstName']}
                  value={formValues.name?.firstName}
                  label={t('fullName.firstName')}
                  fullWidth={false}
                  setValue={
                    setFormValues as Dispatch<
                      SetStateAction<Partial<SignupFormValues>>
                    >
                  }
                />
                <InputField
                  propName={['name', 'lastName']}
                  value={formValues.name?.lastName}
                  label={t('fullName.lastName')}
                  fullWidth={false}
                  setValue={
                    setFormValues as Dispatch<
                      SetStateAction<Partial<SignupFormValues>>
                    >
                  }
                  required
                />
              </Box>
              {company}
              <InputField
                propName="email"
                type="email"
                value={formValues.email}
                label={t('email')}
                setValue={
                  setFormValues as Dispatch<
                    SetStateAction<Partial<SignupFormValues>>
                  >
                }
                inputProps={{ className: styles.FormInput }}
                required
              />
              <InputField
                propName="password"
                value={formValues.password}
                label={t('password.password')}
                setValue={
                  setFormValues as Dispatch<
                    SetStateAction<Partial<SignupFormValues>>
                  >
                }
                type="password"
                required
              />
              <InputField
                propName="passwordConfirm"
                label={t('repeatPassword')}
                onChange={handlePasswordRepeat}
                type="password"
                required
                value={passwordRepeat.passwordConfirm}
                // setValue={handlePasswordRepeat}
                inputProps={{
                  className: styles.FormInput,
                  pattern: `^${formValues.password}$`,
                }}
              />
              <Button disabled={!passwordsIdentical} type="submit">
                {t('signup')}
              </Button>
            </form>
          </Container>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default withTranslation('common')(SignUpPage);

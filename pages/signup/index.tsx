import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import { withTranslation } from "../../i18n";
import OptionsToggler from "../../components/option-toggler/OptionToggler";
import { Layout } from "../../containers/layout";
import { Button } from "../../components/buttons";
import InputField from "../../components/input-field/InputField";
import { useEffect, useState } from "react";
import { PageProps, UserInput, UserType } from "../../lib/types";
import { useMutation, gql } from "@apollo/client";
import styles from "./Signup.module.css";
import { GenderSelector } from "../../components/gender-selector/GenderSelector";
import { useAuth } from "../../hooks/useAuth";

const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      id
    }
  }
`;

const SignUpPage = ({ t }: PageProps): React.ReactElement => {
  const [formValues, setFormValues] = useState<Partial<UserInput>>({
    name: {
      lastName: "",
    },
    gender: Gender.OTHER,
    email: '',
    password: '',
    type: 'TALENT',
  });
  const [passwordsIdentical, setPasswordsIdentical] = useState(true);
  const [createUser, newUser] = useMutation(ADD_USER);
  const [passwordRepeat, setPasswordRepeat] = useState<Record<string, unknown>>(
    { passwordConfirm: "" },
  );
  const auth = useAuth();

  const handlePasswordRepeat = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setPasswordRepeat({ passwordConfirm: e.target.value });
    setPasswordsIdentical(formValues.password === e.target.value);
  };

  const company =
    formValues.type === "EMPLOYER" ? (
      <InputField
        propName="company"
        value={formValues.company}
        label={t("companyName")}
        setValue={setFormValues}
        required
      />
    ) : null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
<<<<<<< HEAD
    if (formValues.email && formValues.password) {
      auth
        .signup(formValues.email, formValues.password)
        .then((response: any) => {
          if (response.user) {
            return createUser({
              variables: {
                input: { id: response.user.uid, ...formValues },
              },
            }).then(({ data }) => {
              const user = data.addUser;
              auth.setContextUser(user);
            });
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
=======
    auth
      .signup(formValues.email, formValues.password)
      .then((response: any) => {
        if (response.user) {
          return createUser({
            variables: {
              input: { id: response.user.uid, ...formValues },
            },
          }).then(({ data }) => {
            const user = data.addUser;
            auth.setContextUser(user);
          });
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
>>>>>>> types for useAuth hook
  };

  useEffect(() => {
    if (newUser.data) {
<<<<<<< HEAD
      console.log('new User:', newUser); //eslint-disable-line no-console
=======
      console.log("new User:", newUser);
>>>>>>> types for useAuth hook
    }
  }, [newUser]);

  return (
    <Layout title="sign up" t={t}>
      <Card>
        <CardContent>
          <Container>
            <Typography variant="h2">{t("pages.signup.header")}</Typography>
            <form onSubmit={handleSubmit}>
              <OptionsToggler
                options={[
                  { value: "TALENT", display: t("type.talent") },
                  { value: "EMPLOYER", display: t("type.employer") },
                ]}
                optionsLabel="type"
                setOption={(type) => {
                  setFormValues((oldValues) => ({
                    ...oldValues,
                    type: type as UserType,
                  }));
                }}
              />
              <Box component="div">
                <GenderSelector t={t} updateFunction={setFormValues} />
                <InputField
                  propName={['name', 'firstName']}
                  value={formValues.name?.firstName}
<<<<<<< HEAD
                  label={t('fullName.firstName')}
=======
                  nesting="name"
                  label={t("fullName.firstName")}
>>>>>>> types for useAuth hook
                  fullWidth={false}
                  setValue={setFormValues}
                />
                <InputField
                  propName={['name', 'lastName']}
                  value={formValues.name?.lastName}
<<<<<<< HEAD
                  label={t('fullName.lastName')}
=======
                  nesting="name"
                  label={t("fullName.lastName")}
>>>>>>> types for useAuth hook
                  fullWidth={false}
                  setValue={setFormValues}
                  required
                />
              </Box>
              {company}
              <InputField
                propName="email"
                type="email"
                value={formValues.email}
                label={t("email")}
                setValue={setFormValues}
                inputProps={{ className: styles.FormInput }}
                required
              />
              <InputField
                propName="password"
                value={formValues.password}
                label={t("password")}
                setValue={setFormValues}
                type="password"
                required
              />
              <InputField
<<<<<<< HEAD
                propName="passwordConfirm"
                label={t('repeatPassword')}
=======
                id="passwordConfirm"
                label={t("repeatPassword")}
>>>>>>> types for useAuth hook
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
                {t("signup")}
              </Button>
            </form>
          </Container>
        </CardContent>
      </Card>
    </Layout>
  );
};

<<<<<<< HEAD
export default withTranslation('common')(SignUpPage);
=======
export default withTranslation("common")(SignUpPage);
>>>>>>> types for useAuth hook

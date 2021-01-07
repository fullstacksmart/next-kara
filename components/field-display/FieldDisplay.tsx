import { Box, Typography } from '@material-ui/core';

interface FieldDisplayProps {
  label: string;
  value: React.ReactNode;
}

export const FieldDisplay = ({
  label,
  value,
}: FieldDisplayProps): React.ReactElement => {
  return (
    <Box component="div">
      <Typography variant="h6">{label}</Typography>
      <Typography id={`bodyFor${label}`} variant="body1">
        {value}
      </Typography>
    </Box>
  );
};

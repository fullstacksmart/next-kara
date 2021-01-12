import { Box, Typography, BoxProps } from '@material-ui/core';

interface FieldDisplayProps extends BoxProps {
  label: string;
  value: React.ReactNode;
  enabled?: boolean;
}

export const FieldDisplay = ({
  label,
  value,
  enabled = true,
}: FieldDisplayProps): React.ReactElement | null => {
  return enabled ? (
    <Box component="div">
      <Typography variant="h6">{label}</Typography>
      <Typography id={`bodyFor${label}`} variant="body1">
        {value}
      </Typography>
    </Box>
  ) : null;
};

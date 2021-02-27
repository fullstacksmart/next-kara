import { Box, Typography, BoxProps } from '@material-ui/core';

interface FieldDisplayProps extends BoxProps {
  label?: string;
  value: React.ReactNode;
  enabled?: boolean;
}

export const FieldDisplay = ({
  label,
  value,
  enabled = true,
}: FieldDisplayProps): React.ReactElement | null => {
  const labelElement = label ? (
    <Typography variant="h6">{label}</Typography>
  ) : null;
  return Boolean(value !== undefined) && enabled ? (
    <Box component="div">
      {labelElement}
      <Typography variant="body1">{value}</Typography>
    </Box>
  ) : null;
};

import {
  CircularProgress,
  CircularProgressProps,
  Box,
  Typography,
  Card,
} from '@material-ui/core';

interface ProgressIndicatorProps extends CircularProgressProps {
  progress: number;
}

export const ProgressIndicator = ({
  progress,
  ...props
}: ProgressIndicatorProps): React.ReactElement => {
  return (
    <Card>
      <Box
        alignItems="center"
        justifyContent="center"
        width="100%"
        display="flex"
        padding="2rem"
      >
        <Box position="relative" display="inline-flex">
          <CircularProgress variant="determinate" value={progress} {...props} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="caption"
              component="div"
              color="textSecondary"
            >{`${Math.round(progress)}%`}</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

import {Container, Grid, Skeleton, Typography, Box} from "@mui/material";

export default function ProductDetailSkeleton() {
  return (
    <Container>
      <Grid container spacing={4} sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rectangular" width={560} height={560} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h1'>
            <Skeleton variant="text" />
          </Typography>
          <Typography variant='h4'>
            <Skeleton variant="text" width={200} />
          </Typography>
          <Box my={4}>
            <Skeleton variant='text' />
            <Skeleton variant='text' />
          </Box>
          <Box mb={3}>
            <Skeleton variant='text' width={200} />
          </Box>
          <Box mb={3}>
            <Skeleton variant='text' width={50} />
          </Box>
          <Box display='flex' justifyContent='center'>
            <Box>
              <Typography variant='h4'>
                <Skeleton variant="text" width={200} />
              </Typography>
              <Typography variant='h4'>
                <Skeleton variant="text" width={200} />
              </Typography>
            </Box>
          </Box>
          <Box mb={3}>
            <Skeleton variant='text' width={100} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

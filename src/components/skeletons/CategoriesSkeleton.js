import {Box, Grid, Skeleton} from "@mui/material";

export default function CategoriesSkeleton() {
  return (
    <Grid container spacing={2}>
      {
        [{}, {}, {}].map((el, i) => (
          <Grid item xs={12} sm={6} md={4} key={i + 1}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Box sx={{pl: 5}}>
                <Skeleton variant='text' width={100}  />
                <Skeleton variant='text' width={100} />
              </Box>
              <Skeleton variant='rectangular' width={200} height={200} />
            </Box>
          </Grid>
        ))
      }
    </Grid>
  )
}

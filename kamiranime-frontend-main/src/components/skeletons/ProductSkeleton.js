import {Box, Grid, Skeleton} from "@mui/material";


const emptyArray = [{}, {}, {}, {} ,{} , {}, {}, {}, {}, {} ,{} , {}];

export default function ProductSkeleton({xs, sm, md}) {
  return (
    <Grid container spacing={3}>
      {
        emptyArray.map((el, i) => (
          <Grid item xs={xs} sm={sm} md={md} key={i + 1}>
            <Box sx={{maxWidth: '300px'}}>
              <Skeleton variant="rectangular" width={250} height={250}/>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Skeleton variant="text" width={200}/>
                <Skeleton variant="circular" width={25} height={25} sx={{ mr: 2 }}/>
              </Box>
              <Skeleton variant="text" width={230}/>
            </Box>
          </Grid>
        ))
      }
    </Grid>
  )
}

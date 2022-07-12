import {Box, Container, Skeleton, Typography} from "@mui/material";

const emptyArray = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

export default function QuestionsSkeleton() {
  return (
    <Box>
      <Box mb={2}>
        <Typography variant='h3'>
          <Skeleton variat='text' width={400}/>
        </Typography>
      </Box>
      {
        emptyArray.map((el, i) => (
          <Box key={i + 1} sx={{border: '1px solid lightgray', p: 1}}>
            <Box display='flex' alignItems='center'>
              <Skeleton variant='circular' width={25} height={25} sx={{mr: 2}}/>
              <Typography variant='h6'>
                <Skeleton variant='text' width={400}/>
              </Typography>
            </Box>
          </Box>
        ))
      }
    </Box>
  )
}

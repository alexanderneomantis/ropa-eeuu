import {Box, Typography} from "@mui/material";
import moment from 'moment';

export default function ProductComment({comment}) {
  return (
    <Box  sx={{  py: 2, borderBottom: '1px solid lightgray' }}>
      <Box>
        <Typography variant='body1' fontWeight='bold' sx={{ pr: 5 }}>{comment.name}</Typography>
        <Typography variant='body1' color='gray'>{moment(comment._createdAt).fromNow()}</Typography>
      </Box>
      <Box sx={{ width: '100%', mt: 2 }}>
        <Typography variant='body1'>{comment.comment}</Typography>
      </Box>
    </Box>
  )
}

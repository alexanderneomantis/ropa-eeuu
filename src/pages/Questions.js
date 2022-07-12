import {styled} from "@mui/material/styles";
import Page from "../components/Page";
import QuestionsList from "../components/questions/QuestionsList";
import useGetQuestions from "../hooks/api/useGetQuestions";
import {Box, Container, Typography} from "@mui/material";
import QuestionsSkeleton from "../components/skeletons/QuestionsSkeleton";


const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const RootStyle = styled(Page)(({theme}) => ({
  minHeight: "100%",
  width: "100%",
  paddingTop: APP_BAR_MOBILE,
  [theme.breakpoints.up("md")]: {
    paddingTop: APP_BAR_DESKTOP,
  },
}));

export default function Questions() {
  const {data, loading} = useGetQuestions()

  return (
    <RootStyle>
      <Container sx={{my: 2}}>
        {
          loading &&
          <>
            <QuestionsSkeleton/>
            <QuestionsSkeleton/>
            <QuestionsSkeleton/>
          </>
        }
        {
          !loading && data && data.length > 0 && data.map(section => (
            <Box key={section._id}>
              <Typography variant='h4' sx={{my: 3}} color='#683A83'>{section.section}</Typography>
              <QuestionsList list={section.questions}/>
            </Box>
          ))
        }
      </Container>
    </RootStyle>
  )
}

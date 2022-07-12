import useGetBanner from "../../hooks/api/useGetBanner";
import {CarouselBasic3} from "../carousel";
import {Skeleton} from "@mui/material";

export default function MainBanner() {
  const {data, loading} = useGetBanner()

  if (loading) return <Skeleton variant='rectangular' width='100%' height={600} />

  console.log(data);

  if (!loading && data && data.length > 0) {
    return (
      <CarouselBasic3 type='banner' data={data} />
    )
  }
}

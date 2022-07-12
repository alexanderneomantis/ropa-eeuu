// material
import { grey } from "@mui/material/colors";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const options = [
  {id: 1, value: 'desc', title: 'Precio mayor a menor'},
  {id: 1, value: 'asc', title: 'Precio menor a mayor'},
]

export default function SortMobile({ setDrawer, filters, setFilters }) {
  return (
    <Grid container sx={{ display: { xs: "flex", md: "none" } }}>
      <Grid
        item
        xs={6}
        sx={{
          borderRight: "solid",
          borderWidth: 1,
          borderColor: grey[100],
          borderBottom: "2px solid " + grey[100],
        }}
      >
        <FormControl
          sx={{
            "& fieldset": { border: "none" },
            "& .MuiInputLabel-root.Mui-focused": {
              display: "none",
            },
          }}
          fullWidth
          size="small"
        >
          <InputLabel id="demo-simple-select-label">Ordenar por</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            placeholder="Ordenar por"
            value={filters.order}
            onChange={e => setFilters(prevState => ({...prevState, order: e.target.value}))}
          >
            <MenuItem value="" disabled>
              Ordenar por
            </MenuItem>
            {
              options.map(el => (
                <MenuItem key={el.id} value={el.value}>{el.title}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>

      <Grid
        item
        xs={6}
        sx={{
          borderLeft: "solid",
          borderWidth: 1,
          borderColor: grey[100],
          borderBottom: "2px solid " + grey[100],
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8.5px 14px",
          "&:hover": { cursor: "pointer" },
        }}
        onClick={() => setDrawer(true)}
      >
        <Typography variant="body1" color="#919EAB">
          Filtrar por
        </Typography>

        <ArrowBackIosIcon
          sx={{ fontSize: "1em", transform: "rotate(-90deg)", mb: "5px" }}
        />
      </Grid>
    </Grid>
  );
}

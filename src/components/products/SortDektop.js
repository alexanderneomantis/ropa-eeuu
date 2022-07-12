// material
import { grey } from "@mui/material/colors";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const options = [
  {id: 1, value: 'desc', title: 'Precio mayor a menor'},
  {id: 1, value: 'asc', title: 'Precio menor a mayor'},
]


export default function SortDesktop({ filters, setFilters }) {
  return (
    <Box
      sx={{
        height: "76.88px",
        px: 3,
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "solid",
        borderWidth: 2,
        borderColor: grey[100],
      }}
    >
      <FormControl
        sx={{
          width: 200,
          "& fieldset": { border: "none" },
          "& .MuiInputLabel-root.Mui-focused": {
            display: "none",
          },
        }}
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
    </Box>
  );
}

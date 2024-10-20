import React from 'react';
import { Container, Typography, Paper, TextField, Accordion, AccordionSummary, AccordionDetails, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './References.css';

const references = [
  {
    author: "Smith, J.",
    year: "2022",
    title: "Understanding Bioinformatics",
    journal: "Bioinformatics Journal",
    volume: "15",
    pages: "123-130",
    link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8738975/"
  },
  {
    author: "Doe, A.",
    year: "2021",
    title: "Advanced Techniques in Genomics",
    journal: "Genomics Review",
    volume: "22",
    pages: "45-60",
    link: "https://www.sciencedirect.com/science/article/pii/S0168952519301126"
  }
];

function References() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [yearFilter, setYearFilter] = React.useState('');

  const filteredReferences = references.filter((ref) => (
    ref.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ref.volume.includes(searchQuery) ||
    ref.pages.includes(searchQuery) ||
    ref.link.includes(searchQuery)) &&
    (!yearFilter || ref.year === yearFilter)
  );

  const uniqueYears = Array.from(new Set(references.map(ref => ref.year)));

  return (
    <Container className="references-container">
      <Typography variant="h4" gutterBottom>References</Typography>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={9}>
          <TextField
            label="Search References"
            variant="outlined"
            fullWidth
            className="references-search"
            margin='normal'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="year-filter-label" shrink={yearFilter !== ''}>
              {!yearFilter ? 'Filter by Year' : ''}
            </InputLabel>
            <Select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              displayEmpty
              labelId="year-filter-label"
              renderValue={selected => selected}
              data-testid="year-filter"
            >
              <MenuItem value=""><em>All Years</em></MenuItem>
              {uniqueYears.map((year, index) => (
                <MenuItem key={index} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Paper elevation={3} className="references-paper">
        {filteredReferences.length > 0 ? (
          filteredReferences.map((ref, index) => (
            <Accordion key={index} className="references-accordion">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                className="references-accordion-summary"
              >
                <Typography>{ref.title} ({ref.author})</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {ref.author} ({ref.year}). <a href={ref.link} target="_blank" rel="noopener noreferrer">{ref.title}</a>. {ref.journal}, {ref.volume}, {ref.pages}.
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography className="no-references">No references found</Typography>
        )}
      </Paper>
    </Container>
  );
}

export default References;
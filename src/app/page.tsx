import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function HomePage() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Benvenuto alla Marketing Page
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Un esempio di landing page per il tuo progetto.
      </Typography>
      <Button variant="contained" color="primary" href="#features">
        Scopri di più
      </Button>
    </Container>
  );
}

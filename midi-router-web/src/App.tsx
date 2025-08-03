import { ThemeProvider, CssBaseline, Container, Box, Grid } from '@mui/material';
import { darkTheme } from './theme';
import { NavigationBar } from './components/NavigationBar';
import { SetupView } from './views/SetupView';
import { StudioView } from './views/StudioView';
import { StageView } from './views/StageView';
import { MidiMonitor } from './components/MidiMonitor';
import { useStudio } from './hooks/useStudio';
import { useMidi } from './hooks/useMidi';

function App() {
  const { currentView } = useStudio();
  
  // Initialize MIDI service
  useMidi();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'setup':
        return <SetupView />;
      case 'studio':
        return <StudioView />;
      case 'stage':
        return <StageView />;
      default:
        return <SetupView />;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavigationBar />
        
        <Container maxWidth="xl" sx={{ flex: 1, py: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={9}>
              {renderCurrentView()}
            </Grid>
            
            <Grid item xs={12} lg={3}>
              <MidiMonitor />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;

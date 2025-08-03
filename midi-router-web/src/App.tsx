import React, { useState, useEffect } from 'react';
import { SetupView } from './views/SetupView';
import { StudioView } from './views/StudioView';
import StageView from './views/StageView';
import { midiService } from './services/MidiService';
import { Container, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

type View = 'setup' | 'studio' | 'stage';

function App() {
  const [view, setView] = useState<View>('setup');

  useEffect(() => {
    midiService.initialize();
  }, []);

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MIDI Router
          </Typography>
          <Button color="inherit" onClick={() => setView('setup')}>Setup</Button>
          <Button color="inherit" onClick={() => setView('studio')}>Studio</Button>
          <Button color="inherit" onClick={() => setView('stage')}>Stage</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 4 }}>
        {view === 'setup' && <SetupView />}
        {view === 'studio' && <StudioView />}
        {view === 'stage' && <StageView />}
      </Box>
    </Container>
  );
}

export default App;

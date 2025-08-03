import { useStudioStore } from '../state/studioStore';
import { useMidiStore } from '../state/midiStore';
import type { MidiConnection } from '../types';

export const useStudio = () => {
  const {
    presets,
    activePresetId,
    currentView,
    addPreset,
    updatePreset,
    removePreset,
    setActivePreset,
    setCurrentView,
    addStageControl,
    updateStageControl,
    removeStageControl,
  } = useStudioStore();

  const { setConnections } = useMidiStore();

  const activePreset = presets.find((preset) => preset.id === activePresetId);

  const createPreset = (presetData: {
    name: string;
    description?: string;
  }) => {
    const newPreset = {
      ...presetData,
      devices: [],
      connections: [],
      stageControls: [],
    };
    addPreset(newPreset);
  };

  const loadPreset = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      setActivePreset(presetId);
      setConnections(preset.connections);
    }
  };

  const saveCurrentRouting = (connections: MidiConnection[]) => {
    if (activePresetId) {
      updatePreset(activePresetId, { connections });
    }
  };

  const duplicatePreset = (presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      const duplicatedPreset = {
        ...preset,
        name: `${preset.name} (Copy)`,
      };
      addPreset(duplicatedPreset);
    }
  };

  return {
    presets,
    activePreset,
    activePresetId,
    currentView,
    createPreset,
    updatePreset,
    removePreset,
    loadPreset,
    setActivePreset,
    setCurrentView,
    saveCurrentRouting,
    duplicatePreset,
    addStageControl,
    updateStageControl,
    removeStageControl,
  };
};
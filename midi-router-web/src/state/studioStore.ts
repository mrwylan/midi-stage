import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Preset, StageControl } from '../types';

interface StudioState {
  presets: Preset[];
  activePresetId: string | null;
  currentView: 'setup' | 'studio' | 'stage';
  
  // Preset management
  addPreset: (preset: Omit<Preset, 'id'>) => void;
  updatePreset: (id: string, updates: Partial<Preset>) => void;
  removePreset: (id: string) => void;
  setActivePreset: (id: string | null) => void;
  
  // View management
  setCurrentView: (view: 'setup' | 'studio' | 'stage') => void;
  
  // Stage controls
  addStageControl: (presetId: string, control: Omit<StageControl, 'id'>) => void;
  updateStageControl: (presetId: string, controlId: string, updates: Partial<StageControl>) => void;
  removeStageControl: (presetId: string, controlId: string) => void;
}

export const useStudioStore = create<StudioState>()(
  persist(
    (set) => ({
      presets: [],
      activePresetId: null,
      currentView: 'setup',

      addPreset: (presetData) =>
        set((state) => ({
          presets: [
            ...state.presets,
            {
              ...presetData,
              id: `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            },
          ],
        })),

      updatePreset: (id, updates) =>
        set((state) => ({
          presets: state.presets.map((preset) =>
            preset.id === id ? { ...preset, ...updates } : preset
          ),
        })),

      removePreset: (id) =>
        set((state) => ({
          presets: state.presets.filter((preset) => preset.id !== id),
          activePresetId: state.activePresetId === id ? null : state.activePresetId,
        })),

      setActivePreset: (id) => set({ activePresetId: id }),

      setCurrentView: (view) => set({ currentView: view }),

      addStageControl: (presetId, controlData) =>
        set((state) => ({
          presets: state.presets.map((preset) =>
            preset.id === presetId
              ? {
                  ...preset,
                  stageControls: [
                    ...preset.stageControls,
                    {
                      ...controlData,
                      id: `control-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    },
                  ],
                }
              : preset
          ),
        })),

      updateStageControl: (presetId, controlId, updates) =>
        set((state) => ({
          presets: state.presets.map((preset) =>
            preset.id === presetId
              ? {
                  ...preset,
                  stageControls: preset.stageControls.map((control) =>
                    control.id === controlId ? { ...control, ...updates } : control
                  ),
                }
              : preset
          ),
        })),

      removeStageControl: (presetId, controlId) =>
        set((state) => ({
          presets: state.presets.map((preset) =>
            preset.id === presetId
              ? {
                  ...preset,
                  stageControls: preset.stageControls.filter(
                    (control) => control.id !== controlId
                  ),
                }
              : preset
          ),
        })),
    }),
    {
      name: 'studio-storage',
    }
  )
);
import { FilmSimulation, LutFormat } from '../luts/types';

interface LutInfo {
  file: File;
  format: LutFormat;
}

class LutStore {
  private luts: Map<FilmSimulation, LutInfo> = new Map();

  addLut(simulation: FilmSimulation, file: File, format: LutFormat) {
    this.luts.set(simulation, { file, format });
  }

  removeLut(simulation: FilmSimulation) {
    this.luts.delete(simulation);
  }

  getLut(simulation: FilmSimulation) {
    return this.luts.get(simulation);
  }

  getAvailableSimulations(): FilmSimulation[] {
    return Array.from(this.luts.keys());
  }
}

export const lutStore = new LutStore();
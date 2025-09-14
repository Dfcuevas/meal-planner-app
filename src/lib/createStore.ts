import { create } from "zustand";
import { StateCreator } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

type ConfigType<T> = {
  name?: string;
  storage?: Storage;
  skipPersist?: boolean;
  // Esta siguiente propiedad es para excluir ciertos estados de la persistencia, por ejemplo si no queremos persistir ciertos estados. El valor significa que será un arreglo de tipo generico T, eso quiere decir que de un objeto de literales, por ejemplo {name: "John", age: 30} el valor de T será "name" | "age". Por lo tanto excludeFromPersist será un arreglo de "name" | "age".
  excludeFromPersist?: Array<keyof T>;
};

const createStore = <T extends object>(
  storeCreator: StateCreator<T, [["zustand/immer", never]]>,
  config?: ConfigType<T>,
) => {
  const { name, storage, skipPersist, excludeFromPersist } = config || {};

  const immerStore = immer(storeCreator);

  if (skipPersist) {
    return create<T>()(immerStore);
  }

  return create<T>()(
    persist(immerStore, {
      name: name || "zustand-store",
      storage: createJSONStorage(() => storage || localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !excludeFromPersist?.includes(key as keyof T),
          ),
        ),
    }),
  );
};
export { createStore };

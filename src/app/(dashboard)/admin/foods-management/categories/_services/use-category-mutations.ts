import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "./categoryMutations";
import { toast } from "sonner";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteCategory(id);
    },
    onSuccess: () => {
      //TODO: show user a toast
      toast.success("Category deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export { useDeleteCategory };

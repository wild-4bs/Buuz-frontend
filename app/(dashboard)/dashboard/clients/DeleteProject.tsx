import { Button } from "@/components/ui/button";
import { queryClient } from "@/providers/QueryProvider";
import { useDeleteProject } from "@/services/projects";
import { TrashIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export const Delete = ({ id }: { id: string }) => {
  const {
    mutate: deleteProject,
    isPending: isDeletingProject,
    error: projectDeleteError,
  } = useDeleteProject((msg: string) => {
    toast.success(msg);
    queryClient.invalidateQueries({ queryKey: ["portfolios"] });
  });

  useEffect(() => {
    if (projectDeleteError) {
      toast.error(projectDeleteError?.message);
    }
  }, [projectDeleteError]);
  return (
    <Button
      variant={"outline"}
      className="w-[30px] h-[30px]"
      onClick={() => deleteProject(id)}
      disabled={isDeletingProject}
    >
      <TrashIcon />
    </Button>
  );
};

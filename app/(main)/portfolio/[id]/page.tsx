import { VimeoPlayer } from "../components/Player";

const ProjectPlayer = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return <VimeoPlayer id={id} />;
};

export default ProjectPlayer;

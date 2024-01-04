import dynamic from "next/dynamic";
const DynamicEditForm = dynamic(() => import("@/components/Forms/EditForm"), {
  ssr: false,
});

type Props = {
  params: { id: string };
};

const EditTodo = ({ params: { id } }: Props) => {
  return <DynamicEditForm id={id} />;
};

export default EditTodo;

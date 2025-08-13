import useFlowNameStore from "@/store/flowname";

export const getFlowName = () => {
  const { getName } = useFlowNameStore();

  return getName();
};

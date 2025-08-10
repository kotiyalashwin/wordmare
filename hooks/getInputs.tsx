import useInputStore from "@/store/inputs"

export const useGetInputs = () => {
    const {getAllInputs} = useInputStore();
    const inputs = getAllInputs()

    return inputs
}
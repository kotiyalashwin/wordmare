import { Badge } from '@/components/ui/badge';
import { createReactBlockSpec } from '@blocknote/react';




export const InputBadgeBlock = createReactBlockSpec(
  {
    type: "input",
     propSchema: {
      // Define a prop to hold the selected input string.
      selectedInput: {
        default: "",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      const {block} = props
      const selectedInput = block.props.selectedInput
      console.log(selectedInput)
      return (
       
        <div className="flex gap-2 mt-4 flex-wrap">
          <Badge className="flex bg-white border border-teal-600 text-teal-500 text-md items-center gap-1 pr-2">
            <span className="font-semibold">{selectedInput}</span>
          </Badge>
        </div>
      );
    },
  }
);

// function InputBadgeRenderer(){
//     const {getAllInputs} = useInputStore();
//     const inputs = getAllInputs();
//     return (
//     <div className="flex gap-2 mt-4 flex-wrap">
//       {inputs.map((input, idx) => (
//         <Badge
//           key={idx}
//           className="flex bg-white text-teal-500 text-lg items-center gap-1 pr-2"
//         >
//           <span className="font-semibold">{input}</span>
//           {/* <Button variant="ghost" size="icon" className="p-1"> */}
//             {/* You could add an icon here, like a close button to remove the input */}
//           {/* </Button> */}
//         </Badge>
//       ))}
//     </div>
//   );
// }       
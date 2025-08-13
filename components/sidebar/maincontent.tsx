import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputTab } from "./input-tab";
export const MainContentSidebar = () => {
  const output = false;
  return (
    <Tabs defaultValue="account" className="w-full h-full">
      <TabsList className="w-full  py-6">
        <TabsTrigger
          value="inputs"
          className="text-teal-600 font-semibold p-4  data-[state=active]:border-teal-600 "
        >
          Inputs
        </TabsTrigger>
        <TabsTrigger
          value="output"
          className="text-teal-600 font-semibold p-4 data-[state=active]:border-teal-600"
        >
          Outputs
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inputs">
        <InputTab />
      </TabsContent>
      <TabsContent value="output">
        {output ? "Here is your output" : "Output not generated"}
      </TabsContent>
    </Tabs>
  );
};

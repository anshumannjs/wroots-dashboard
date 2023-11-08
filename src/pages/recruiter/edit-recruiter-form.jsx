import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { createRecruiter } from "@/services/recruiter";
import ReactSelect from "react-select";

const categoryOptions = [
  {
    label: "BPO",
    value: 1,
  },
  {
    label: "IT",
    value: 6,
  },
  {
    label: "NON IT",
    value: 7,
  },
];

export function EditRecruiterForm({rowData}) {
    console.log(rowData)
  const form = useForm({
    mode: "onChange",
    values: rowData
  });

  const { mutate } = useMutation(createRecruiter, {
    onSuccess: ({ data }) => console.log(data),
  });

  function onSubmit(data) {
    // mutate(data);
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="recruiter_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  id="name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recruiter_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                id="email"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recruiter_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  id="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="my-auto">Category</FormLabel>
              <FormControl>
                <ReactSelect
                  options={categoryOptions}
                  className="text-sm"
                  isSearchable={false}
                  value={categoryOptions.find(option => option.value === field.value)}
                  onChange={(e) => field.onChange(e.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isSuperAdmin"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <Checkbox id="superAdmin" className="mt-2" checked={field.value} value={field.value} onCheckedChange={(e) => field.onChange(e)} />
              <FormLabel>Super Admin</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="isManager"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <Checkbox id="Manager" className="mt-2" checked={field.value} value={field.value} onCheckedChange={(e) => field.onChange(e)} />
              <FormLabel>Manager</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4 w-full">
          Update Recruiter
        </Button>
      </form>
    </Form>
  );
}

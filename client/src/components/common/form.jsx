import React from "react";
import { SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Select } from "radix-ui";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  const renderInputsByComponentType = ({ controlItem }) => {
    let element = null;

    if (!controlItem) return null;

    const { componentType, name, placeholder, type } = controlItem;

    const value = formData[name] || "";

    switch (componentType) {
      case "input":
        element = (
          <Input
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          ></Input>
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <selectContent>
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((optionItem) => {
                    return (
                      <SelectItem key={optionItem.id} value={optionItem.id}>
                        {optionItem.label}
                      </SelectItem>
                    );
                  })
                : null}
            </selectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={name}
            placeholder={placeholder}
            id={controlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          ></Textarea>
        );
        break;

      default:
        element = (
          <Input
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          ></Input>
        );
        break;
    }

    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => {
          return (
            <div key={controlItem.name} className="grid w-full gap-1.5">
              <Label className="mb-1 font-semibold">{controlItem.label}</Label>
              {renderInputsByComponentType({ controlItem })}
            </div>
          );
        })}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;

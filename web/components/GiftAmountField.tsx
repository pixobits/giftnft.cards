import { materialRegister } from "utils/materialForm";
import { Button, ButtonGroup, InputAdornment, TextField } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { useCallback } from "react";

export default function GiftAmountField() {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const power = useWatch({ control, name: "amountTenPowerMultiplier" });
  const onUnitChange = useCallback(
    (power: number) => () => {
      setValue("amountTenPowerMultiplier", power);
    },
    [setValue]
  );

  return (
    <TextField
      type="number"
      {...materialRegister(register, "amount")}
      label="Amount"
      fullWidth
      helperText={errors.amount?.message}
      error={!!errors.amount}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ButtonGroup size="small" variant="contained">
              <Button
                color={power === 18 ? "primary" : "inherit"}
                onClick={onUnitChange(18)}
              >
                Metis
              </Button>
              <Button
                color={power === 9 ? "primary" : "inherit"}
                onClick={onUnitChange(9)}
              >
                Gwei
              </Button>
              <Button
                color={power === 1 ? "primary" : "inherit"}
                onClick={onUnitChange(1)}
              >
                Wei
              </Button>
            </ButtonGroup>
          </InputAdornment>
        ),
      }}
    />
  );
}

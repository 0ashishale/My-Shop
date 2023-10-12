import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Typography } from "@mui/material";

const StepperSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    { label: <Typography>Payment</Typography>, icon: <AccountBalanceIcon /> },
  ];
  const stepStyles = {
    boxSizing: "border-box",
  };


  return (
    <div>
      <Box sx={{ width: "100%", marginTop: 1 }}>
        <Stepper activeStep={activeStep} alternativeLabel style={stepStyles}>
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                className={`${activeStep >= index ? 'text-green-600' : 'text-gray-400'} md:text-base text-lg`}
                icon={item.icon}
              >
                {item.label} 
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};

export default StepperSteps;

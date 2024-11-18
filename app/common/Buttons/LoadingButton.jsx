import { Button, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingButton({
  loading,
  disabled = false,
  onClick,
  size = "medium",
  label = "Save",
  type = "button",
  sx = {},
  endIcon,
  startIcon,
  onClickCapture,
}) {
  return (
    <>
      <Button
        disabled={loading || disabled}
        variant={"contained"}
        size={size}
        onClick={onClick}
        type={type}
        endIcon={!loading && endIcon}
        startIcon={!loading && startIcon}
        sx={{ color: disabled && "grey !important", ...sx }}
        onClickCapture={onClickCapture}
      >
        {loading ? (
          <CircularProgress
            color="warning"
            size={"25px !important"}
            sx={{
              fontSize: "25px !important",
              width: "25px !important",
              height: "25px !important",
            }}
          />
        ) : (
          label
        )}
      </Button>
    </>
  );
}

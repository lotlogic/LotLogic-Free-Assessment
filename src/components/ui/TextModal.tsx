import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  type DialogProps,
} from "@mui/material";
import { useMemo } from "react";

type TextModalProps = {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
};

export const TextModal: React.FC<TextModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dialogPaperProps = useMemo(
    () => ({
      sx: {
        borderRadius: "16px",
        maxHeight: isMobile ? "70vh" : "80vh",
        width: isMobile ? "92vw" : "720px",
        margin: "16px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",
      },
    }),
    [isMobile],
  );

  const handleClose: DialogProps["onClose"] = (event, reason) => {
    if (!onClose) {
      if (event && (reason === "backdropClick" || reason === "escapeKeyDown"))
        return;
    } else onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: dialogPaperProps,
        backdrop: () => ({
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }),
      }}
    >
      {!!title && (
        <DialogTitle
          sx={{
            padding: "20px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div>
            {title && (
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#111827",
                }}
              >
                {title}
              </Typography>
            )}
          </div>
        </DialogTitle>
      )}

      <DialogContent
        sx={{
          padding: isMobile ? "20px !important" : "40px 30px !important",
          overflow: "auto",
        }}
      >
        {!title && <span className="size-10 float-right md:hidden"></span>}
        {children}
      </DialogContent>

      {!!onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "#6b7280",
            padding: "8px",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "#f3f4f6",
              color: "#374151",
            },
          }}
        >
          <Close width={24} height={24} />
        </IconButton>
      )}
    </Dialog>
  );
};

export default TextModal;

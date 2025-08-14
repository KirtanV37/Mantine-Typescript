import { Modal, Button } from "@mantine/core";
import type React from "react";

type ModalProps = {
  opened: boolean;
  onClose: () => void;
  title: string;
  content?: React.ReactNode;
  onOpen: () => void;
};

const CustomModal = ({
  opened,
  onClose,
  title,
  content,
  onOpen,
}: ModalProps) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={title}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        padding={"xl"}
        centered
      >
        {content}
      </Modal>

      {!opened && <Button onClick={onOpen}>Open modal</Button>}
    </>
  );
};

export default CustomModal;

/**
 * 
| Prop Name         | Type                      | Description                                                                            |
| ----------------- | ------------------------- | -------------------------------------------------------------------------------------- |
| `opened`          | `boolean`                 | **Required** – Controls whether the modal is open or closed                            |
| `onClose`         | `() => void`              | **Required** – Function to close the modal (usually passed from parent)                |
| `title`           | `ReactNode`               | Optional – Title text or custom JSX for modal header                                   |
| `children`        | `ReactNode`               | Content to display inside modal body                                                   |
| `size`            | `MantineSize | string`    | Optional – Width of the modal (`'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'100%'`, etc.) |
| `centered`        | `boolean`                 | Optional – If `true`, modal is vertically centered                                     |
| `overlayProps`    | `ModalBaseOverlayProps`   | Optional – Customize overlay (e.g., blur, color, opacity)                              |
| `withCloseButton` | `boolean`                 | Optional – Show/hide default close (×) button                                          |
| `fullScreen`      | `boolean`                 | Optional – Fullscreen modal (great for mobile)                                         |
| `radius`          | `MantineRadius | string`  | Optional – Corner radius of modal                                                      |
| `padding`         | `MantineNumberSize`       | Optional – Inner spacing of the modal                                                  |
| `className`       | `string`                  | Optional – For custom styling via class                                                |
| `styles`          | `MantineStyleProps`       | Optional – For inline style customization                                              |

 */

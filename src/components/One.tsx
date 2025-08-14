import { Button } from "@mantine/core";
import { Container } from "@mantine/core";

const One = () => {
  return (
    <Container>
      <Button>Add</Button>
      <Button variant="outline">Read</Button>
      <Button variant="gradient">Gradient Button</Button>
      <Button style={{ textTransform: "lowercase" }}>Custom Button</Button>
    </Container>
  );
};

export default One;

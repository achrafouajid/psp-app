/* import {
  FC,
  useEffect,
  useRef,
  KeyboardEvent,
  useState,
  FormEvent,
  FocusEvent,
  useCallback,
} from "react";
import { Box, Input, Link, Stack, Typography, styled } from "@mui/material";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";

const VerificationInput = styled(Input)(({ theme }) => ({
  width: "2rem",
  fontSize: "1.4rem",
  fontWeight: "600",
  color: theme.palette.secondary.main,
  input: { textAlign: "center " },
  // hide arrows
  appearance: "textfield",
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    appearance: "none",
    margin: 0,
  },
}));

type InputOrNull = HTMLInputElement | null;

interface Props {
  title: string;
  email: string;
  length?: number;
}

const schema = yup
  .array()
  .required()
  .of(yup.number().required())
  .when("$length", (len, schema) => {
    if (len) return schema.length(len);
    else return schema;
  });

const VerificationForm: FC<Props> = ({ title, email, length = 4 }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const update = useCallback((index: number, val: string) => {
    return setCode((prevState) => {
      const slice = prevState.slice();
      slice[index] = val;
      return slice;
    });
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  function handleKeyDown(evt: KeyboardEvent<HTMLInputElement>) {
    const index = parseInt(evt.currentTarget.dataset.index as string);
    const form = formRef.current;
    if (isNaN(index) || form === null) return; // just in case

    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const prevInput: InputOrNull = form.querySelector(`.input-${prevIndex}`);
    const nextInput: InputOrNull = form.querySelector(`.input-${nextIndex}`);
    switch (evt.key) {
      case "Backspace":
        if (code[index]) update(index, "");
        else if (prevInput) prevInput.select();
        break;
      case "ArrowRight":
        evt.preventDefault();
        if (nextInput) nextInput.focus();
        break;
      case "ArrowLeft":
        evt.preventDefault();
        if (prevInput) prevInput.focus();
    }
  }

  function handleChange(evt: FormEvent<HTMLInputElement>) {
    const value = evt.currentTarget.value;
    const index = parseInt(evt.currentTarget.dataset.index as string);
    const form = formRef.current;
    if (isNaN(index) || form === null) return; // just in case

    let nextIndex = index + 1;
    let nextInput: InputOrNull = form.querySelector(`.input-${nextIndex}`);

    update(index, value[0] || "");
    if (value.length === 1) nextInput?.focus();
    else if (index < length - 1) {
      const split = value.slice(index + 1, length).split("");
      split.forEach((val) => {
        update(nextIndex, val);
        nextInput?.focus();
        nextIndex++;
        nextInput = form.querySelector(`.input-${nextIndex}`);
      });
    }
  }

  function handleFocus(evt: FocusEvent<HTMLInputElement>) {
    evt.currentTarget.select();
  }

  useEffect(() => {
    // check validity if form has been submitted
    if (isSubmitted) {
      try {
        setIsValid(schema.isValidSync(code, { context: { length } }));
      } catch (e) {}
    }
  }, [code]); // eslint-disable-line

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsSubmitted(true);
    try {
      const data = await schema.validate(code, { context: { length } });
      alert(`Code is ${data?.join("")}`);
    } catch (e) {
      setIsValid(false);
    }
  }

  return (
    <Box
      component="form"
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      bgcolor="white"
      py={5}
      px={{ xs: 2.5, md: 5.5 }}
      borderRadius="16px"
      boxShadow={3}
    >
      <Typography variant="h4" mb={1.2}>
        {title}
      </Typography>
      <Typography mb={2.5}>
        Activation code was sent to your email
        <br />
        <Box component={"strong"} color={"primary.main"}>
          {email}
        </Box>
      </Typography>
      <Stack
        component={"fieldset"}
        border={"none"}
        direction={"row"}
        spacing={1.2}
        justifyContent={"center"}
      >
        {code.map((value, i) => (
          <VerificationInput
            key={i}
            value={value}
            error={isSubmitted && !isValid}
            inputProps={{
              type: "number",
              className: `input-${i}`,
              "aria-label": `Number ${i + 1}`,
              "data-index": i,
              pattern: "[0-9]*",
              inputtype: "numeric",
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              onFocus: handleFocus,
            }}
          />
        ))}
      </Stack>
      <Box textAlign="center" mt={2.5}>
        <LoadingButton
          type="submit"
          size="large"
          variant="contained"
          sx={{ paddingX: (theme) => theme.spacing(8) }}
        >
          {"confirm"}
        </LoadingButton>
      </Box>
      <Box mt={2.5} textAlign="right" sx={{ a: { color: "secondary.main" } }}>
        <Typography>
          <Box component="span" color="primary.main">
            Didn't receive the code?
          </Box>
          &nbsp;
          <Link href="/auth/register">Resend</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default VerificationForm; 

 */

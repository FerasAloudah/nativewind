import { useCallback, useState } from "react";
import { GestureResponderEvent, Platform, PressableProps } from "react-native";

declare module "react-native" {
  interface PressableProps {
    onHoverIn?: (event: MouseEvent) => void;
    onHoverOut?: (event: MouseEvent) => void;
  }
}

export interface Interaction extends PressableProps {
  active: boolean;
  hover: boolean;
  focus: boolean;
  onMouseDown?: PressableProps["onPressIn"];
  onMouseUp?: PressableProps["onPressOut"];
}

export interface UseInteractionOptions extends PressableProps {
  className?: string;
  isGroupIsolate: boolean;
  isParent: boolean;
}

export function useInteraction({
  isGroupIsolate,
  isParent,
  focusable = true,
  onFocus,
  onBlur,
  onHoverIn,
  onHoverOut,
  onPressIn,
  onPressOut,
  className = "",
}: UseInteractionOptions) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState(false);

  const handleFocus = useCallback<NonNullable<PressableProps["onFocus"]>>(
    (event) => {
      if (focusable) {
        if (onFocus) {
          onFocus(event);
        }

        setFocus(true);
      }
    },
    [focusable, onFocus]
  );

  const handleBlur = useCallback<NonNullable<PressableProps["onFocus"]>>(
    (event) => {
      if (onBlur) {
        onBlur(event);
      }

      setFocus(false);
    },
    [onBlur]
  );

  const handleHoverIn = useCallback(
    (event: MouseEvent) => {
      if (onHoverIn) {
        onHoverIn(event);
      }

      setHover(true);
    },
    [onHoverIn]
  );

  const handleHoverOut = useCallback(
    (event: MouseEvent) => {
      if (onHoverOut) {
        onHoverOut(event);
      }

      setHover(false);
    },
    [onHoverOut, setHover]
  );

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      if (onPressIn) {
        onPressIn(event);
      }
      event.stopPropagation();

      setActive(true);
      setFocus(false);
    },
    [onPressIn]
  );

  const handlePressOut = useCallback(
    (event: GestureResponderEvent) => {
      if (onPressOut) {
        onPressOut(event);
      }
      event.stopPropagation();

      setActive(false);
    },
    [onPressOut]
  );

  const interaction: Interaction = {
    active,
    hover,
    focus,
  };

  const isGroupIsolateOrParent = isGroupIsolate || isParent;

  if (isGroupIsolateOrParent || className.includes("focus:")) {
    interaction.onBlur = handleBlur;
    interaction.onFocus = handleFocus;
  }

  if (isGroupIsolateOrParent || className.includes("hover:")) {
    interaction.onHoverIn = handleHoverIn;
    interaction.onHoverOut = handleHoverOut;
  }

  if (isGroupIsolateOrParent || className.includes("active:")) {
    if (Platform.OS === "web") {
      interaction.onMouseDown = handlePressIn;
      interaction.onMouseUp = handlePressOut;
    } else {
      interaction.onPressIn = handlePressIn;
      interaction.onPressOut = handlePressOut;
    }
  }

  return interaction;
}

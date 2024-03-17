import "./sliderOverlay.scss";

// This component is a slidein overlay that is used to display information, forms or activity information.
// It is used in the ActivityHub and in the ActivityHubAdmin.
export default function SliderOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="sliderOverlay">
      <div id="sliderOverlay__content">{children}</div>
    </div>
  );
}

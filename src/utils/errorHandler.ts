export function handleError(err: unknown) {
  if (err instanceof Error) {
    console.error("Error:", err.message);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }

  console.error("Unknown error:", err);
  return Response.json(
    { success: false, error: "Unknown error" },
    { status: 500 }
  );
}

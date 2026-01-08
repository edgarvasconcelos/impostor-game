export function randomAvatar(gender: "male" | "female") {
  const base =
    gender === "male"
      ? "https://api.dicebear.com/7.x/adventurer/svg?seed=male"
      : "https://api.dicebear.com/7.x/adventurer/svg?seed=female";

  return `${base}-${Math.random()}`;
}

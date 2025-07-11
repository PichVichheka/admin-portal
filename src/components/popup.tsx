// components/user-edit-modal.tsx
"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUserEditModal } from "@/store/user-edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestUser } from "@/lib/api/user-api";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { IUserUpdate } from "@/types/user-type";

export function UserEditModal() {
  const { currentUser } = useUserEditModal();
  const { UPDATE_USER_FIELD } = requestUser();
  const { isOpen, close, userId } = useUserEditModal();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ full_name: "", user_name: "", email: "" });

  // const { data: user, isLoading } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: () => FETCH_USER_ID(userId!),
  //   enabled: !!userId && isOpen,
  // });

  useEffect(() => {
    if (!isOpen)
      setForm({
        full_name: "",
        user_name: "",
        email: "",
      });
    else if (currentUser) {
      setForm({
        full_name: currentUser.full_name,
        user_name: currentUser.user_name,
        email: currentUser.email,
      });
    }
  }, [currentUser, isOpen]);

  const mutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IUserUpdate }) =>
      UPDATE_USER_FIELD(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-list"] });
      close();
    },
  });

  const handleSave = () => {
    if (!userId) return;
    mutation.mutate({
      id: userId,
      payload: {
        full_name: form.full_name,
        user_name: form.user_name,
        email: form.email,
      },
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit User</AlertDialogTitle>
        </AlertDialogHeader>

        <>
          <Input
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            placeholder="Full name"
          />
          <Input
            value={form.user_name}
            onChange={(e) => setForm({ ...form, user_name: e.target.value })}
            placeholder="User name"
            className="mt-2"
          />
          <Input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="mt-2"
          />
          <Button
            className="mt-4"
            onClick={handleSave}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="secondary"
            className=""
            onClick={close}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
        </>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// components/user-edit-modal.tsx
"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUserEditModal } from "@/constants/user-edit";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { requestUser } from "@/lib/api/user-api";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { IUserUpdate } from "@/types/user-type";

export function UserEditModal() {
  const { FETCH_USER_ID, UPDATE_USER_FIELD } = requestUser();
  const { isOpen, close, userId } = useUserEditModal();
  const queryClient = useQueryClient();
  const [full_name, setFull_name] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => FETCH_USER_ID(userId!),
    enabled: !!userId && isOpen,
  });

  useEffect(() => {
    if (!isOpen) setFull_name(""), setUserName(""), setEmail("");
  }, [isOpen, user]);

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
        full_name,
        user_name: userName,
        email,
      },
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit User</AlertDialogTitle>
        </AlertDialogHeader>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Input
              value={full_name}
              onChange={(e) => setFull_name(e.target.value)}
              placeholder="Full name"
            />
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="User name"
              className="mt-2"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

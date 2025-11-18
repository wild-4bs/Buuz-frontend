"use client";
import React, { useEffect, useState, useMemo } from "react";
import { AddButton } from "./AddButton";
import { Input } from "@/components/ui/input";
import { Employee } from "./Employee";
import { useGetEmployees, useUpdateEmployeesOrder } from "@/services/employees";
import { Button } from "@/components/ui/button";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { toast } from "sonner";
import { Employee as EmployeeType } from "@/types/employees";

export const Content = () => {
  const [name, setName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [canSave, setCanSave] = useState(false);

  const { data, isPending } = useGetEmployees({ name });
  const { mutate: updateOrder, isPending: updating } = useUpdateEmployeesOrder(
    (msg) => {
      toast.success(msg);
      setCanSave(false);
    }
  );

  const sensors = useSensors(useSensor(PointerSensor));

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => setName(nameInput), 400);
    return () => clearTimeout(timeout);
  }, [nameInput]);

  // Only sort once when data changes, memoize for performance
  const sortedEmployees = useMemo(() => {
    if (!data?.payload) return [];
    return [...data.payload].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [data]);

  // Update state only when data changes
  useEffect(() => {
    setEmployees(sortedEmployees);
  }, [sortedEmployees]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = employees.findIndex((emp) => emp._id === active.id);
    const newIndex = employees.findIndex((emp) => emp._id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    // Update in place without creating unnecessary arrays
    setEmployees((prev) => {
      const next = arrayMove(prev, oldIndex, newIndex);
      return next;
    });
    setCanSave(true);
  };

  const handleSaveOrder = () => {
    const reordered = employees.map((emp, index) => ({
      id: emp._id,
      order: index + 1,
    }));
    updateOrder({ employees: reordered });
  };

  return (
    <div className="bg-white p-4 m-2 rounded-2xl">
      <div className="header flex gap-2 justify-between">
        <Input
          placeholder="Search by name.."
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          disabled={isPending}
        />
        <div className="options flex items-center gap-2">
          {canSave && (
            <Button onClick={handleSaveOrder} disabled={updating}>
              {updating ? "Saving..." : "Save"}
            </Button>
          )}
          <AddButton />
        </div>
      </div>

      {employees.length === 0 && (
        <h1 className="text-xl font-medium text-center mt-4 text-gray-400">
          No Employees
        </h1>
      )}

      {employees.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={employees.map((emp) => emp._id)}
            strategy={rectSortingStrategy}
          >
            <div
              className="employees flex flex-wrap gap-4 mt-8"
              style={{ rowGap: 8 }}
            >
              {employees.map((employee) => (
                <Employee key={employee._id} employee={employee} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

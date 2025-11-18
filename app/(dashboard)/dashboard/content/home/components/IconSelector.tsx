"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedIconSelectorProps {
  value?: string;
  onChange: (icon: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  showClearButton?: boolean;
  className?: string;
}

export const EnhancedIconSelector = ({
  value,
  onChange,
  placeholder = "Select icon...",
  disabled = false,
  showClearButton = true,
  className = "",
}: EnhancedIconSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(40);
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemIncrement = 40;

  // إزالة بعض الأيقونات التي قد تسبب مشاكل أو غير مرغوب فيها
  const { Search: _, X: __, ChevronDown: ___, ...icons } = LucideIcons;
  const iconNames = Object.keys(icons);

  const filteredIcons = useMemo(
    () =>
      iconNames.filter((name) =>
        name?.toLowerCase()?.includes(search?.toLowerCase())
      ),
    [search, iconNames]
  );

  const visibleIcons = useMemo(
    () => filteredIcons?.slice(0, visibleCount),
    [filteredIcons, visibleCount]
  );

  const SelectedIcon: any = value ? icons[value as keyof typeof icons] : null;

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollTop + clientHeight + 50 >= scrollHeight) {
        setVisibleCount((prev) =>
          Math.min(prev + itemIncrement, filteredIcons.length)
        );
      }
    },
    [filteredIcons.length]
  );

  const handleIconSelect = useCallback(
    (iconName: string) => {
      onChange(iconName);
      setIsOpen(false);
    },
    [onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(null);
    },
    [onChange]
  );

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setIsOpen(!isOpen);
  }, [disabled, isOpen]);

  // إعادة تعيين القيم عند فتح المكون
  useEffect(() => {
    if (isOpen) {
      setVisibleCount(itemIncrement);
      setSearch("");
      // التركيز على مربع البحث بعد فترة قصيرة
      setTimeout(() => {
        searchRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // إعادة تعيين عدد الأيقونات المرئية عند البحث
  useEffect(() => {
    setVisibleCount(itemIncrement);
  }, [search]);

  // التعامل مع الضغط على مفتاح Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  // إغلاق المكون عند النقر خارجه
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* الزر الرئيسي */}
      <Button
        variant="outline"
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className="flex items-center justify-between w-full h-10 px-3"
      >
        <div className="flex items-center gap-2 truncate">
          {SelectedIcon && <SelectedIcon size={18} />}
          <span
            className={
              value ? "truncate text-sm" : "text-muted-foreground text-sm"
            }
          >
            {value ? value : placeholder}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {showClearButton && value && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClear(e as any);
                }
              }}
              className="text-gray-500 hover:text-red-500 cursor-pointer p-1"
            >
              <X size={12} />
            </span>
          )}
          <ChevronDown
            size={16}
            className={cn(
              "text-gray-400 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </Button>

      {/* قائمة الأيقونات */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-md shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search icons..."
                className="pl-9 text-sm"
              />
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="max-h-[320px] overflow-y-auto p-2"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {visibleIcons.length === 0 ? (
              <div className="text-sm text-center text-muted-foreground py-8">
                No icons found
              </div>
            ) : (
              <div className="grid grid-cols-6 gap-1">
                {visibleIcons.map((iconName) => {
                  const Icon: any = icons[iconName as keyof typeof icons];
                  const isSelected = value === iconName;
                  return (
                    <button
                      key={iconName}
                      onClick={() => handleIconSelect(iconName)}
                      title={iconName}
                      className={cn(
                        "group flex flex-col items-center justify-center p-2 rounded-md transition-all hover:bg-blue-50 focus:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300",
                        isSelected
                          ? "bg-blue-100 border border-blue-500 text-blue-600"
                          : "border border-transparent hover:border-blue-300"
                      )}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleIconSelect(iconName);
                        }
                      }}
                    >
                      <Icon
                        size={18}
                        className="mb-1 group-hover:scale-110 transition-transform"
                      />
                      <span className="text-[9px] text-center truncate w-full">
                        {iconName}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {visibleCount < filteredIcons.length && (
            <div className="text-center text-xs text-muted-foreground py-2 border-t">
              Showing {visibleCount} of {filteredIcons.length} icons
            </div>
          )}
        </div>
      )}
    </div>
  );
};

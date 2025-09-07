import React from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-3 w-4 h-4 text-[var(--muted-foreground)]" />
        <Input
          id={id}
          type="email"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 bg-[var(--cinema-card)] border-[var(--cinema-border)]"
          required
        />
      </div>
    </div>
  );
};

export default EmailInput;

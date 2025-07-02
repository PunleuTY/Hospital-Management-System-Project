export default function Patient() {}
// PatientsTable.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const initialPatients = [
  { id: "P001", name: "John Smith", age: 45, gender: "Male", status: "Active", lastVisit: "2024-01-15", action: "Routine Checkup" },
  { id: "P002", name: "Sarah Wilson", age: 32, gender: "Female", status: "Active", lastVisit: "2024-01-14", action: "Vaccination" },
  { id: "P003", name: "Mike Davis", age: 58, gender: "Male", status: "Inactive", lastVisit: "2024-01-10", action: "Consultation" },
  { id: "P004", name: "Emma Taylor", age: 28, gender: "Female", status: "Active", lastVisit: "2024-01-16", action: "Follow-up" },
];

export default function PatientsTable() {
  const [patients, setPatients] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({ name: "", age: "", gender: "Male", status: "Active", lastVisit: "", action: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  // Load from localStorage on first render
  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('patients')) || initialPatients;
    const savedAllPatients = JSON.parse(localStorage.getItem('allPatients')) || initialPatients;
    setPatients(savedPatients);
    setAllPatients(savedAllPatients);
  }, []);

  // Save to localStorage whenever patients or allPatients changes
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
    localStorage.setItem('allPatients', JSON.stringify(allPatients));
  }, [patients, allPatients]);

  const handleAddPatient = () => {
    const newPatient = {
      id: `P00${allPatients.length + 1}`,
      ...form,
    };
    setPatients([...patients, newPatient]);
    setAllPatients([...allPatients, newPatient]);
    setForm({ name: "", age: "", gender: "Male", status: "Active", lastVisit: "", action: "" });
    setDialogOpen(false);
  };

  const handleRemove = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  const toggleStatus = (id) => {
    setPatients(
      patients.map((p) =>
        p.id === id ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" } : p
      )
    );
  };

  const filteredPatients = patients.filter((p) => {
    const matchesFilter = filter === "" || p.status === filter;
    const matchesSearch =
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.age.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Patients</h1>
        <div className="flex gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">+ Add Patient</Button>
            </DialogTrigger>
            <DialogContent className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Age</Label>
                <Input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
              </div>
              <div>
                <Label>Gender</Label>
                <Select value={form.gender} onValueChange={(value) => setForm({ ...form, gender: value })}>
                  <SelectTrigger>{form.gender}</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                  <SelectTrigger>{form.status}</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Last Visit</Label>
                <Input type="date" value={form.lastVisit} onChange={(e) => setForm({ ...form, lastVisit: e.target.value })} />
              </div>
              <div>
                <Label>Action</Label>
                <Input value={form.action} onChange={(e) => setForm({ ...form, action: e.target.value })} />
              </div>
              <Button onClick={handleAddPatient}>Add</Button>
            </DialogContent>
          </Dialog>
          <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">History</Button>
            </DialogTrigger>
            <DialogContent className="space-y-2 max-h-[400px] overflow-y-auto">
              <h2 className="text-lg font-semibold">Patient History</h2>
              {allPatients.map((p) => (
                <div key={p.id} className="border p-2 rounded-md">
                  <p><strong>ID:</strong> {p.id}</p>
                  <p><strong>Name:</strong> {p.name}</p>
                  <p><strong>Age:</strong> {p.age}</p>
                  <p><strong>Gender:</strong> {p.gender}</p>
                  <p><strong>Status:</strong> {p.status}</p>
                  <p><strong>Last Visit:</strong> {p.lastVisit}</p>
                  <p><strong>Action:</strong> {p.action}</p>
                </div>
              ))}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search patients..."
          className="w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter by status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilter("")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("Active")}>Active</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("Inactive")}>Inactive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 border-b text-gray-600">
              <tr>
                <th className="px-6 py-3">Patient ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Age</th>
                <th className="px-6 py-3">Gender</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last Visit</th>
                <th className="px-6 py-3">Actions</th>
                <th className="px-6 py-3">Remove</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{patient.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        patient.status === "Active" ? "bg-black text-white" : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => toggleStatus(patient.id)}
                    >
                      {patient.status}
                    </Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">...</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>{patient.action}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="destructive" onClick={() => handleRemove(patient.id)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

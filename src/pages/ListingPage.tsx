"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { Check, Upload, MapPin, Phone, Mail, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { submitBusinessListing } from "@/contexts/BusinessService";

const benefits = [
  "Lifetime listing - No monthly fees",
  "Show up in local search results",
  "Add photos, logo, and business hours",
  "Get customer reviews and ratings",
  "Share QR code for easy access",
  "Professional business profile page",
  "Fast approval within 24-48 hours",
  "Edit and update anytime",
];

const ListingPage = () => {
  // Form fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  // Images
  const [images, setImages] = useState<File[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  // Status
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle image upload + compression
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setIsCompressing(true);

    try {
      const compressedFiles = await Promise.all(
        acceptedFiles.slice(0, 8).map(async (file) => {
          const options = {
            maxSizeMB: 0.2, // ~200KB
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          };
          const compressedFile = await imageCompression(file, options);
          return new File([compressedFile], file.name, { type: file.type });
        })
      );
      setImages((prev) => [...prev, ...compressedFiles].slice(0, 8));
    } catch (err) {
      console.error("Image compression failed:", err);
    } finally {
      setIsCompressing(false);
    }
  }, []);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: 8,
  });

  // 🚀 Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("phone", phone);
      if (email) formData.append("email", email);
      if (website) formData.append("website", website);

      images.forEach((img) => formData.append("photos", img));

      await submitBusinessListing(formData);

      setSuccess(true);
      setName("");
      setCategory("");
      setDescription("");
      setAddress("");
      setPhone("");
      setEmail("");
      setWebsite("");
      setImages([]);
    } catch (err: any) {
      console.error(err);
      setError("Failed to submit listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">List Your Business Online</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get discovered by thousands of local customers. Create your professional business listing in minutes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Listing Form */}
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Business Information</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your business name"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select category</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Home Services">Home Services</option>
                    <option value="Beauty & Spa">Beauty & Spa</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Photography">Photography</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe your business and services"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="Full business address"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                {/* Upload Photos */}
                <div>
                  <Label>Upload Photos</Label>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                      isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {isDragActive ? "Drop your images here..." : "Drag & drop images or click to browse"}
                    </p>
                    {isCompressing && <p className="text-sm mt-2 text-primary">Compressing images...</p>}
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(img)}
                            alt={`Upload ${index + 1}`}
                            className="h-24 w-full object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ✅ Submit Button */}
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Listing"}
                </Button>

                {success && <p className="text-green-600 text-center">✅ Business submitted successfully!</p>}
                {error && <p className="text-red-600 text-center">❌ {error}</p>}
              </form>
            </Card>

            {/* Pricing & Benefits */}
            <div className="space-y-6">
              <Card className="p-8 bg-primary text-primary-foreground">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Simple Pricing</h3>
                  <div className="text-6xl font-bold mb-2">₹149</div>
                  <div className="text-xl mb-1">One-time payment</div>
                  <div className="text-sm opacity-90">No monthly fees • Lifetime listing</div>
                </div>
                <Button size="lg" variant="secondary" className="w-full text-lg">
                  Continue to Payment
                </Button>
                <p className="text-center text-sm mt-4 opacity-80">
                  100% Secure Payment • Fast Approval
                </p>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl font-bold mb-6">What's Included</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ListingPage;

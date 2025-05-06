'use client'

interface Props {
  setImage: (val: File | null) => void
  preview: string | null
  setPreview: (val: string | null) => void
}

export default function ProfileImageUpload({ setImage, preview, setPreview }: Props) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {preview && <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover" />}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="text-sm"
      />
    </div>
  )
}
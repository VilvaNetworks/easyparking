"use client";

export default function BlogCommentForm() {
  return (
    <div className="mt-14 border-t border-[#e8e8e8] pt-10">
      <h3 className="text-[#1a1a1a] text-[20px] font-bold mb-2">Leave a Reply</h3>
      <p className="text-[13px] text-[#888] mb-7">
        Your email address will not be published. Required fields are marked *
      </p>
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="comment-body" className="block text-[13px] font-semibold text-[#333] mb-1.5">
            Comment <span className="text-[#ff8c00]">*</span>
          </label>
          <textarea
            id="comment-body"
            rows={6}
            className="w-full border border-[#d0d0d0] px-4 py-3 text-[14px] text-[#333] outline-none focus:border-[#ff8c00] resize-none transition-colors"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="comment-name" className="block text-[13px] font-semibold text-[#333] mb-1.5">
              Name <span className="text-[#ff8c00]">*</span>
            </label>
            <input
              id="comment-name"
              type="text"
              className="w-full border border-[#d0d0d0] px-4 py-2.5 text-[14px] text-[#333] outline-none focus:border-[#ff8c00] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="comment-email" className="block text-[13px] font-semibold text-[#333] mb-1.5">
              Email <span className="text-[#ff8c00]">*</span>
            </label>
            <input
              id="comment-email"
              type="email"
              className="w-full border border-[#d0d0d0] px-4 py-2.5 text-[14px] text-[#333] outline-none focus:border-[#ff8c00] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="comment-website" className="block text-[13px] font-semibold text-[#333] mb-1.5">Website</label>
            <input
              id="comment-website"
              type="url"
              className="w-full border border-[#d0d0d0] px-4 py-2.5 text-[14px] text-[#333] outline-none focus:border-[#ff8c00] transition-colors"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="saveInfo" className="accent-[#ff8c00]" />
          <label htmlFor="saveInfo" className="text-[13px] text-[#555]">
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="bg-[#ff8c00] hover:bg-[#e67e00] text-white font-semibold text-[15px] px-8 py-3 transition-colors duration-300"
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}

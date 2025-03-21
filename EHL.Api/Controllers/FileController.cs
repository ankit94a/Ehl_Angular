using EHL.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EHL.Api.Controllers
{
	[Route("api/[controller]")]
	public class FileController : Controller
	{
		private readonly IFileManager _fileManager;
		public FileController(IFileManager fileManager)
		{
			_fileManager = fileManager;
		}

		[HttpGet("download/{location}")]
		public async Task<IActionResult> DownloadFile(string location)
		{
			//var file = await _fileManager.GetDoucmentById(fileId, downloadType); // Retrieve file details from DB

			if (location == null || string.IsNullOrEmpty(location))
			{
				return NotFound("File not found.");
			}
			// Stored file path
			if (!System.IO.File.Exists(location))
			{
				return NotFound("File does not exist on the server.");
			}

			var fileType = GetMimeType(Path.GetExtension(location)); // Get MIME type

			var memoryStream = new MemoryStream();
			using (var stream = new FileStream(location, FileMode.Open, FileAccess.Read))
			{
				await stream.CopyToAsync(memoryStream);
			}

			memoryStream.Position = 0;
			var fileName = Path.GetFileName(location);

			return File(memoryStream, fileType, fileName);
		}

		// Helper function to determine the MIME type
		private string GetMimeType(string extension)
		{
			var mimeTypes = new Dictionary<string, string>
	{
		{ ".pdf", "application/pdf" },
		{ ".doc", "application/msword" },
		{ ".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
		{ ".xls", "application/vnd.ms-excel" },
		{ ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
		{ ".png", "image/png" },
		{ ".jpg", "image/jpeg" },
		{ ".jpeg", "image/jpeg" },
		{ ".txt", "text/plain" },
		{ ".csv", "text/csv" }
	};

			return mimeTypes.ContainsKey(extension) ? mimeTypes[extension] : "application/octet-stream";
		}

	}
}

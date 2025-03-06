using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EHL.Common.Enum
{
	public class Enum
	{
		[JsonConverter(typeof(StringEnumConverter))]
		public enum NewStatus
		{
			New = 1,
			Old
		}
	}
}
